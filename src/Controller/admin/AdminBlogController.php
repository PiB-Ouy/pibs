<?php

namespace App\Controller\admin;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

Class AdminBlogController{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct(Environment $twig){
        $this->twig=$twig;
    }

    public function index(): Response {
        return new Response($this->twig->render('/admin/admin_blog.html.twig'));
    }
}