<?php

namespace App\Controller;

use App\Entity\FriendRequest;
use App\Entity\User;
use App\Form\FriendRequestType;
use App\Repository\FriendRequestRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/friend-request')]
class FriendRequestController extends AbstractController
{
    #[Route('/', name: 'app_friend_request_index', methods: ['GET'])]
    public function index(FriendRequestRepository $friendRequestRepository): Response
    {
        return $this->render('friend_request/index.html.twig', [
            'friend_requests' => $friendRequestRepository->findAll(),
        ]);
    }


    #[Route('/get-friends/{user}', name: 'app_friend_request_get-friends', methods: ['GET'])]
    public function getFriends(User $user, FriendRequestRepository $friendRequestRepository): Response
    {
        $friendRequests = $friendRequestRepository->getFriends($user, "accepted");
        $friends = [];

        foreach ($friendRequests as $friendRequest) {
            $friends[] = ($friendRequest->getSourceUser()->getId() == $user->getId()) ? $friendRequest->getTargetUser() : $friendRequest->getSourceUser();
        }


        return $this->json(["friends" => $friends]);
    }


    #[Route('/new', name: 'app_friend_request_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em, UserRepository $userRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $userFrom = $this->getUser();
        $userTo = $userRepository->find($data["userTo"]);

        $friendRequest = new FriendRequest();

        $friendRequest->setSourceUser($userFrom);
        $friendRequest->setTargetUser($userTo);
        $friendRequest->setState("pending");

        $em->persist($friendRequest);
        $em->flush();

        return $this->json(["success" => true]);
    }


    #[Route('/recived/{user}', name: 'app_friend_request_received', methods: ['GET'])]
    public function getReceived(User $user, FriendRequestRepository $friendRequestRepository): Response
    {
        return $this->json([
            'receivedFriendRequest' => $friendRequestRepository->findBy(["targetUser" => $user, "state" => "pending"]),
        ]);
    }


    #[Route('/sent/{user}', name: 'app_friend_request_sent', methods: ['GET'])]
    public function getSent(User $user, FriendRequestRepository $friendRequestRepository): Response
    {
        return $this->json([
            'sentFriendRequest' => $friendRequestRepository->findBy(["sourceUser" => $user, "state" => "pending"]),
        ]);
    }


    #[Route('/{id}', name: 'app_friend_request_show', methods: ['GET'])]
    public function show(FriendRequest $friendRequest): Response
    {
        return $this->render('friend_request/show.html.twig', [
            'friend_request' => $friendRequest,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_friend_request_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EntityManagerInterface $em, FriendRequest $friendRequest, FriendRequestRepository $friendRequestRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $friendRequest->setState($data["value"] ? "accepted" : "rejected");
        
        $em->persist($friendRequest);
        $em->flush();

        $friendRequests = $friendRequestRepository->getFriends($friendRequest->getTargetUser(), "accepted");
        $friends = [];

        foreach ($friendRequests as $friendRequest) {
            $friends[] = ($friendRequest->getSourceUser()->getId() == $friendRequest->getTargetUser()->getId()) ? $friendRequest->getTargetUser() : $friendRequest->getSourceUser();
        }

        return $this->json([
            "friends" => $friends,
            "receivedFriendRequest" => $friendRequestRepository->findBy(["targetUser" => $friendRequest->getTargetUser(), "state" => "pending"]),
        ]);
    }

    #[Route('/{id}', name: 'app_friend_request_delete', methods: ['POST'])]
    public function delete(Request $request, FriendRequest $friendRequest, FriendRequestRepository $friendRequestRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$friendRequest->getId(), $request->request->get('_token'))) {
            $friendRequestRepository->remove($friendRequest, true);
        }

        return $this->redirectToRoute('app_friend_request_index', [], Response::HTTP_SEE_OTHER);
    }
}
