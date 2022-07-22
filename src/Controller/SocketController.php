<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\WsConnection;

class SocketController extends AbstractController implements MessageComponentInterface
{
    // #[Route('/socket', name: 'app_socket')]
    // public function index(): Response
    // {
    //     return $this->render('socket/index.html.twig', [
    //         'controller_name' => 'SocketController',
    //     ]);
    // }


    protected $clients;
    private $userRepository;
    private $em;

    public function __construct(EntityManagerInterface $em) {
        $this->clients = new \SplObjectStorage;
        $this->em = $em;
        $this->userRepository = $this->em->getRepository(User::class);

        echo "Servidor socket conectado";
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $msg = json_decode($msg, true);

        if (isset($msg["session"])) { 
            $user = $this->userRepository->find($msg["session"]["id"]);
            $user->setState("connected");

            $userArray = $msg["session"];
            $userArray["state"] = "connected"; 

            $this->em->persist($user);
            $this->em->flush();

            $this->clients->attach($from, $userArray);

            foreach ($this->clients as $client) {
                if ($client != $from) $client->send(json_encode(["connected" => $this->clients[$from]]));
            }
        }

        if (isset($msg["chat"])) { 
            foreach ($this->clients as $client) {
                if ($this->clients[$client]["id"] == $msg["chat"]["user"]) $client->send($msg["chat"]["message"]);
            }
        }

        if (isset($msg["page"])) {
            dump($msg["player"]);
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $user = $this->userRepository->find($this->clients[$conn]["id"]);
        $user->setState("disconnected");

        $this->em->persist($user);
        $this->em->flush();

        $userArray = $this->clients[$conn];
        $userArray["state"] = "disconnected"; 

        $this->clients->attach($conn, $userArray);

        foreach ($this->clients as $client) {
            if ($client != $conn) $client->send(json_encode(["connected" => $this->clients[$conn]]));
        }

        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();

        $user = $this->userRepository->find($this->clients[$conn]["id"]);
        $user->setState("connected");

        $this->em->persist($user);
        $this->em->flush();

        $userArray = $this->clients[$conn];
        $userArray["state"] = "disconnected"; 

        $this->clients->attach($conn, $userArray);

        foreach ($this->clients as $client) {
            if ($client != $conn) $client->send(json_encode(["connected" => $this->clients[$conn]]));
        }
    }
}
