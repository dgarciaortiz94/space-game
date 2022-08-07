<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\PlayerRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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


    #[Route('/game', name: 'app_play')]
    public function game(Request $request, UserRepository $userRepository, PlayerRepository $playerRepository): Response
    {
        $sourceUser = $this->getUser();
        $targetUser = $userRepository->find($request->get("target-user"));

        $chosenShip = $playerRepository->find($request->get("chosenShip"));
        
        return $this->render('game/index.html.twig', [
            'sourceUser' => $sourceUser,
            'targetUser' => $targetUser,
            'chosenShip' => $chosenShip,
        ]);
    }

}
