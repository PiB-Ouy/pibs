<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;

Class HomeController{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct(Environment $twig){
        $this->twig=$twig;
    }

    /**
     * @Route("/", name="home", methods={"GET"})
     */
    public function index(): Response {
        return new Response($this->twig->render('pages/home.html.twig'));
    }
}