<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220803154431 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE player ADD projectile_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE player ADD CONSTRAINT FK_98197A65CE6E9B6C FOREIGN KEY (projectile_id) REFERENCES projectile (id)');
        $this->addSql('CREATE INDEX IDX_98197A65CE6E9B6C ON player (projectile_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE player DROP FOREIGN KEY FK_98197A65CE6E9B6C');
        $this->addSql('DROP INDEX IDX_98197A65CE6E9B6C ON player');
        $this->addSql('ALTER TABLE player DROP projectile_id');
    }
}
