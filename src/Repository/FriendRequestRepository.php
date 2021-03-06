<?php

namespace App\Repository;

use App\Entity\FriendRequest;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FriendRequest>
 *
 * @method FriendRequest|null find($id, $lockMode = null, $lockVersion = null)
 * @method FriendRequest|null findOneBy(array $criteria, array $orderBy = null)
 * @method FriendRequest[]    findAll()
 * @method FriendRequest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FriendRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FriendRequest::class);
    }

    public function add(FriendRequest $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(FriendRequest $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

   /**
    * @return FriendRequest[] Returns an array of FriendRequest objects
    */
   public function getFriends(User $user, string $state): array
   {
       return $this->createQueryBuilder('f')
            ->andWhere('f.state = :state')
            ->andWhere('f.sourceUser = :user OR f.targetUser = :user')
            ->setParameter('state', $state)
            ->setParameter('user', $user)
            // ->orderBy('f.id', 'ASC')
            // ->setMaxResults(10)
            ->getQuery()
            ->getResult()
       ;
   }

//    public function findOneBySomeField($value): ?FriendRequest
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
