<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    #[Route('/session', name: 'app_session')]
    public function session(): Response
    {
        return $this->render('lobby/session.html.twig', [

        ]);
    }


    #[Route('/lobby', name: 'app_user-interface')]
    public function index(): Response
    {
        return $this->render('lobby/index.html.twig', [

        ]);
    }


    #[Route('/game/{sourceUser}/{targetUser}', name: 'app_play')]
    public function game(User $sourceUser, User $targetUser): Response
    {
        return $this->render('game/index.html.twig', [
            'sourceUser' => $sourceUser,
            'targetUser' => $targetUser,
        ]);
    }

}
