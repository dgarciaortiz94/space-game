<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlayerRepository::class)]
class Player
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 50)]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    private $img;

    #[ORM\Column(type: 'float')]
    private $acelerationCoefficient;

    #[ORM\Column(type: 'float')]
    private $turnCoeficient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(string $img): self
    {
        $this->img = $img;

        return $this;
    }

    public function getAcelerationCoefficient(): ?float
    {
        return $this->acelerationCoefficient;
    }

    public function setAcelerationCoefficient(float $acelerationCoefficient): self
    {
        $this->acelerationCoefficient = $acelerationCoefficient;

        return $this;
    }

    public function getTurnCoeficient(): ?float
    {
        return $this->turnCoeficient;
    }

    public function setTurnCoeficient(float $turnCoeficient): self
    {
        $this->turnCoeficient = $turnCoeficient;

        return $this;
    }

}
