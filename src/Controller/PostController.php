<?php

namespace App\Controller;

use App\Entity\Post;
use App\Form\PostType;
use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\PostRepository; 
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * 
 * @param PaginatorInterface $paginator
 * @param Request $request
 * @param Response
 */
class PostController extends AbstractController
{

    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security){
        $this->security=$security;
    }

    /**
     * @Route("/post", name="post_index", methods={"GET"})
     */
    public function index(PaginatorInterface $paginator, Request $request, PostRepository $postRepository): Response
    { 

        $posts=$paginator->paginate(
            $postRepository->findAll(),
            $request->query->getInt('page', 1),
            6
        );


        return $this->render('post/index.html.twig', [
            'posts' => $posts
        ]);
    }

    

    

    /**
     * @Route("/post/{id}", name="post_show", methods={"GET", "POST"})
     */
    public function show(Post $post, Request $request, EntityManagerInterface $manager): Response
    {
        $comment=new Comment();
        $form=$this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $comment->setCreatedAt(new \DateTime());
            $comment->setPost($post);
            $user=$this->security->getUser();
            $comment->setAuthor($user);
            
            $manager->persist($comment);
            $manager->flush();

           //return $this->redirectToRoute('post_show', ['id'=>$post->getId()]);
            
            
        }
        $comments=$post->getComments();

        return $this->render('post/show.html.twig', [
            'post' => $post,
            'comments' => $comments,
            'commentForm'=>$form->createView()
        ]);
    }

   

    
}
