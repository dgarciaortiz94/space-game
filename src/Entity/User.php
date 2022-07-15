<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $username;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private $ipAddress;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private $state;

    // #[ORM\OneToMany(mappedBy: 'sourceUser', targetEntity: FriendRequest::class, orphanRemoval: true)]
    // private $sentFriendRequests;

    // #[ORM\OneToMany(mappedBy: 'targetUser', targetEntity: FriendRequest::class, orphanRemoval: true)]
    // private $receivedFriendRequests;

    public function __construct()
    {
        $this->fRequests = new ArrayCollection();
        $this->receivedRequests = new ArrayCollection();
        $this->friendRequest = new ArrayCollection();
        $this->friendRequests = new ArrayCollection();
        $this->sentFriendRequests = new ArrayCollection();
        $this->receivedFriendRequests = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    // /**
    //  * @return Collection<int, FriendRequest>
    //  */
    // public function getSentFriendRequests(): Collection
    // {
    //     return $this->sentFriendRequests;
    // }

    // public function addSentFriendRequest(FriendRequest $sentFriendRequest): self
    // {
    //     if (!$this->sentFriendRequests->contains($sentFriendRequest)) {
    //         $this->sentFriendRequests[] = $sentFriendRequest;
    //         $sentFriendRequest->setSourceUser($this);
    //     }

    //     return $this;
    // }

    // public function removeSentFriendRequest(FriendRequest $sentFriendRequest): self
    // {
    //     if ($this->sentFriendRequests->removeElement($sentFriendRequest)) {
    //         // set the owning side to null (unless already changed)
    //         if ($sentFriendRequest->getSourceUser() === $this) {
    //             $sentFriendRequest->setSourceUser(null);
    //         }
    //     }

    //     return $this;
    // }

    // /**
    //  * @return Collection<int, FriendRequest>
    //  */
    // public function getReceivedFriendRequests(): Collection
    // {
    //     return $this->receivedFriendRequests;
    // }

    // public function addReceivedFriendRequest(FriendRequest $receivedFriendRequest): self
    // {
    //     if (!$this->receivedFriendRequests->contains($receivedFriendRequest)) {
    //         $this->receivedFriendRequests[] = $receivedFriendRequest;
    //         $receivedFriendRequest->setTargetUser($this);
    //     }

    //     return $this;
    // }

    // public function removeReceivedFriendRequest(FriendRequest $receivedFriendRequest): self
    // {
    //     if ($this->receivedFriendRequests->removeElement($receivedFriendRequest)) {
    //         // set the owning side to null (unless already changed)
    //         if ($receivedFriendRequest->getTargetUser() === $this) {
    //             $receivedFriendRequest->setTargetUser(null);
    //         }
    //     }

    //     return $this;
    // }

    public function getIpAddress(): ?string
    {
        return $this->ipAddress;
    }

    public function setIpAddress(?string $ipAddress): self
    {
        $this->ipAddress = $ipAddress;

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
