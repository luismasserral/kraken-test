<?php

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('files', 'FilesController@list');
    $router->post('files', 'FilesController@upload');
    $router->delete('files', 'FilesController@delete');
});