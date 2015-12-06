<?php

namespace App\Front\Presenters;

use Nette;
use App\Model;


/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{

    protected function startup() {
        parent::startup();
        if (!filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE) ) {
            $this->template->liveReload = TRUE;
        } else {
            $this->template->liveReload = FALSE;
        }
    }

}
