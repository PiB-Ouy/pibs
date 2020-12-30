<?php

namespace App\Controller\admin;

use DateTime;
use App\Entity\Post;
use Twig\Environment;
use App\Form\PostType;
use App\Repository\PostRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;


/**
 * @Route("/admin/posts", name="admin_")
 */
Class AdminBlogController extends AbstractController{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct(Environment $twig){
        $this->twig=$twig;
    }

    /**
     * @Route("/", name="posts")
     * @return Response
     */
    public function index(PaginatorInterface $paginator, Request $request, PostRepository $postRepository): Response {
        $posts=$paginator->paginate(
            $postRepository->findAll(),
            $request->query->getInt('page', 1),
            12
        );
        return $this->render('/admin/admin_blog.html.twig', [
            'posts' => $posts
        ]);        
    }





     /**
     * @Route("/{id}/edit", name="post_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Post $post, SluggerInterface $slugger): Response
    {
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $imageFile = $form->get('imageFile')->getData();
        
            // this condition is needed because the 'image_url' field is not required
            // so the JPG file must be processed only when a file is uploaded
            if ($imageFile) {
                $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$imageFile->guessExtension();
    
                // Move the file to the directory where images are stored
                try {
                    $imageFile->move(
                        $this->getParameter('images_directory'),
                        $newFilename
                    );
                   
                    
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                    var_dump($e);
                    die;
                }

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $post->setImageFile($imageFile);
                $post->setImageUrl($newFilename);
            }

            $post->setCreatedAt(new DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($post);
            $entityManager->flush();

            return $this->redirectToRoute('admin_posts');
        }

        if($post->getImageUrl()==null){
            $post->setImageUrl("");
            $post->setImageFile(new File($this->getParameter('images_directory').'defaultFile.jpg'));
        }else{
            $post->setImageFile(new File(
                $this->getParameter('images_directory').$post->getImageUrl()
            ));
        }

        return $this->render('post/edit.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="post_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Post $post): Response
    {
        if ($this->isCsrfTokenValid('delete'.$post->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            if($post->getImageUrl()){
                unlink(new File($this->getParameter('images_directory').$post->getImageUrl()));
            }
            $entityManager->remove($post);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_posts');
    }

    /**
     * @Route("/new", name="post_new", methods={"GET","POST"})
     */
    public function new(Request $request, SluggerInterface $slugger): Response
    {
        $post = new Post();
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $imageFile = $form->get('imageFile')->getData();
            

             // this condition is needed because the 'brochure' field is not required
            // so the JPG file must be processed only when a file is uploaded
            if ($imageFile) {
                $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$imageFile->guessExtension();

                // Move the file to the directory where brochures are stored
                try {
                    $imageFile->move(
                        $this->getParameter('images_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                    echo('probleme upload');
                }

                // updates the 'brochureFilename' property to store the PDF file name
                // instead of its contents
                $post->setImageUrl($newFilename);
            }

            $post->setCreatedAt(new DateTime());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($post);
            $entityManager->flush();

            return $this->redirectToRoute('post_index');
        }

        return $this->render('post/new.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }

}