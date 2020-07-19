<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use App\Entity\Comment;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\FixtureInterface;

class PostFixtures extends Fixture implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
    
        $faker= Factory:: create('fr_FR');
        for($i=0; $i<30; $i++){
            $words = rand(2, 8);
            $paragraphs=rand(1, 5);
            $post = new Post();
            $post  
                ->setTitle($faker->words($words, true))
                ->setContent($faker->paragraph($paragraphs, true))
                ->setAuthor('PiB')
                ->setCreatedAt($faker->dateTimeBetween('-60 days', '-1 days'));
            $manager->persist($post);

            $rand=rand(0, 6);
            for($j=0; $j<=$rand; $j++){
                $comment = new Comment();
                $comment  
                ->setContent($faker->sentences(1, true))
                ->setAuthor($faker->firstName())
                ->setCreatedAt($faker->dateTimeBetween('-60 days', '-1 days'))
                ->setPost($post);
            $manager->persist($comment);
            }
        }


        $manager->flush();
        
    }
}
