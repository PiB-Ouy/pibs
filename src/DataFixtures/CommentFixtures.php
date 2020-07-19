<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use App\Entity\Comment;
use Faker\ORM\Doctrine\Populator;
use App\Controller\PostController;
use App\Repository\PostRepository;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\Common\DataFixtures\FixtureInterface;

class CommentFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
    //
    

    }
}
