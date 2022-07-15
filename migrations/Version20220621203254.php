<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220621203254 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE player ADD img VARCHAR(255) NOT NULL, DROP right_img, DROP left_img, DROP right_jump_img, DROP left_jump_img, DROP right_physical_attack_img, DROP left_physical_attack_img, DROP speed_jumping, DROP jumping_height');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE player ADD left_img VARCHAR(255) NOT NULL, ADD right_jump_img VARCHAR(255) NOT NULL, ADD left_jump_img VARCHAR(255) NOT NULL, ADD right_physical_attack_img VARCHAR(255) NOT NULL, ADD left_physical_attack_img VARCHAR(255) NOT NULL, ADD speed_jumping INT NOT NULL, ADD jumping_height INT NOT NULL, CHANGE img right_img VARCHAR(255) NOT NULL');
    }
}
