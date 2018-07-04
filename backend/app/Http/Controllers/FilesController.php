<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class FilesController extends BaseController
{
    public function list(): JsonResponse
    {
        return response()->json(
            app('FilesService')->getFiles()
        );
    }

    public function upload(Request $request): JsonResponse
    {
        if (!$request->hasFile('file')) {
            return response()->json([
                'error' => 'A file must be provided',
            ], 400);
        }

        $file = $request->file('file');

        if (!app('FilesService')->isFileValid($file)) {
            return response()->json([
                'error' => 'File does not meet requirements',
            ], 400);
        }

        try {
            return response()->json(
                app('FilesService')->saveFile($file)
            );
        } catch (FileException $exception) {
            return response()->json([
                'error' => 'File could not have been uploaded',
            ], 500);
        }
    }

    public function delete(): JsonResponse
    {
        return response()->json(['delete' => 1]);
    }
}
