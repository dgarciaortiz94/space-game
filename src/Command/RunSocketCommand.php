<?php

namespace App\Command;

use App\Controller\SocketController;
use Doctrine\ORM\EntityManagerInterface;
use Ratchet\App;
use Ratchet\Server\EchoServer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:run-socket',
    description: 'Add a short description for your command',
)]
class RunSocketCommand extends Command
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();

        $this->em = $em;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $app = new App('192.168.1.41', 8282, '192.168.1.41');
        $app->route('/game', new SocketController($this->em), array('*'));
        $app->run();

        return Command::SUCCESS;
    }
}
