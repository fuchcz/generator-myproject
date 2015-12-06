<?php

$container = require __DIR__ . '/../private/app/bootstrap.php';
$container->getByType('Nette\Application\Application')->run();
