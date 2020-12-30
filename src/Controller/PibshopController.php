<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;

class PibshopController
{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    /**
     * @Route("/pibshop", name="pibshop", methods={"GET"})
     */
    public function index(): Response
    {
        return new Response($this->twig->render('pages/pibshop.html.twig'));
    }
}
