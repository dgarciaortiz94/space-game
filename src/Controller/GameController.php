<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    #[Route('/lobby', name: 'app_user-interface')]
    public function index(): Response
    {
        return $this->render('lobby/index.html.twig', [
            'controller_name' => 'GameController',
        ]);
    }


    #[Route('/game', name: 'app_play')]
    public function play(): Response
    {
        return $this->render('game/index.html.twig', [
            
        ]);
    }

}
