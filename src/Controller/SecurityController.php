<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController {

    public function login(AuthenticationUtils $authenticationUtils, Request $request){
        
        $lastUsername= $authenticationUtils->getLastUsername();
        $lastError=$authenticationUtils->getLastAuthenticationError();
        return $this->render('security/login.html.twig', [
            'last_username'=>$lastUsername,
            'error'=>$lastError
        ]);
    }

    public function logout(AuthenticationUtils $authenticationUtils){
        //disconnect
        return $this->render('pages/home.html.twig');
    }

    public function registration(Request $request, EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder){
        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);
        
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $hash=$encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($hash);
            $manager->persist($user);
            $manager->flush();
            $this->redirectToRoute('login'); 
        }
        
        return $this->render('security/registration.html.twig', [
            'form'=>$form->createView()
        ]);
    }
}