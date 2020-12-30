<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserFixtures extends Fixture
{

    /**
     * 
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder=$encoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('FurioXI');
        $user->setPassword($this->encoder->encodePassword($user, '45110Chateauneufsurloire'));
        $manager->persist($user);

        $user2 = new User();
        $user2->setUsername('Vanessa');
        $user2->setPassword($this->encoder->encodePassword($user2, 'vanessa'));
        $manager->persist($user2);

        $user3 = new User();
        $user3->setUsername('Lily');
        $user3->setPassword($this->encoder->encodePassword($user3, 'lily'));
        $manager->persist($user3);

        $user3 = new User();
        $user3->setUsername('Hantz');
        $user3->setPassword($this->encoder->encodePassword($user3, 'hantz'));
        $manager->persist($user3);

        $manager->flush();
    }
}
