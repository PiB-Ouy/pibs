<?php

namespace App\DataFixtures;

use App\Entity\Role;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class RoleFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $role = new Role('ROLE_USER');
        $manager->persist($role);

        $role2 = new Role('ROLE_ADMIN');
        $manager->persist($role2);

        $role3 = new Role('ROLE_FREE');
        $manager->persist($role3);

        $role4 = new Role('ROLE_SUPER_ADMIN');
        $manager->persist($role4);

        $role5 = new Role('ROLE_PEMIUM');
        $manager->persist($role5);

        $manager->flush();
    }
}
