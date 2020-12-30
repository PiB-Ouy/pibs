<?php

namespace App\Controller\admin;

use App\Entity\User;
use Twig\Environment;
use App\Form\UserType;
use App\Repository\UserRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/admin/users", name="admin_")
 */
Class AdminUserController extends AbstractController{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct(Environment $twig){
        $this->twig=$twig;
    }

    /**
     * @Route("/", name="users")
     * @return Response
     */
    public function index(PaginatorInterface $paginator, Request $request, UserRepository $userRepository): Response
    {
        $users=$paginator->paginate(
            $userRepository->findAll(),
            $request->query->getInt('page', 1),
            12
        );


        return $this->render('user/index.html.twig', [
            'users' => $users
        ]);
        
    }

     /**
     * @Route("/{id}", name="user_show", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="user_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, User $user): Response
    {
        $user->setConfirmPassword($user->getPassword());
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_users');
        }

       



        return $this->render('user/edit.html.twig', [
            
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_users');
    }


   
}