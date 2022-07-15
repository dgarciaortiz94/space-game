<?php

namespace App\Entity;

use App\Repository\FriendRequestRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FriendRequestRepository::class)]
class FriendRequest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'sentFriendRequests')]
    #[ORM\JoinColumn(nullable: false)]
    private $sourceUser;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'receivedFriendRequests')]
    #[ORM\JoinColumn(nullable: false)]
    private $targetUser;

    #[ORM\Column(type: 'string', length: 15, nullable: true)]
    private $state;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSourceUser(): ?User
    {
        return $this->sourceUser;
    }

    public function setSourceUser(?User $sourceUser): self
    {
        $this->sourceUser = $sourceUser;

        return $this;
    }

    public function getTargetUser(): ?User
    {
        return $this->targetUser;
    }

    public function setTargetUser(?User $targetUser): self
    {
        $this->targetUser = $targetUser;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(?string $state): self
    {
        $this->state = $state;

        return $this;
    }
}
