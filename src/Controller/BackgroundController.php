<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

Class BackgroundController{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct(Environment $twig){
        $this->twig=$twig;
    }

    public function index(): Response {
        return new Response($this->twig->render('pages/background.html.twig'));
    }
}