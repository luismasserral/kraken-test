<?php

declare(strict_types=1);

namespace App\Services;

use DirectoryIterator;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FilesService
{
    const UPLOAD_PATH = __DIR__ . '/../../uploads/';

    public function getFiles(): array
    {
        $files = [];

        foreach (new DirectoryIterator(self::UPLOAD_PATH) as $fileInfo) {
            if ($fileInfo->isDot() || $fileInfo->getFilename() === '.gitkeep') {
                continue;
            }

            array_push($files, $this->getDirectoryFileInfo($fileInfo));
        }

        return $files;
    }

    public function isFileValid(UploadedFile $file): bool
    {
        return $this->isFileSizeValid($file) && $this->isFileExtensionValid($file);
    }

    public function saveFile(UploadedFile $file): array
    {
        $saveName = $this->getSaveName($file);
        $savedFile = $file->move(self::UPLOAD_PATH, $saveName);

        return $this->getSavedFileInfo($savedFile);
    }

    private function getDirectoryFileInfo(DirectoryIterator $fileInfo): array
    {
        return [
            'name' => $fileInfo->getFilename(),
            'size' => $fileInfo->getSize(),
        ];
    }

    private function isFileSizeValid(UploadedFile $file): bool
    {
        return $file->getSize() <= env('FILES_MAX_SIZE');
    }

    private function isFileExtensionValid(UploadedFile $file): bool
    {
        return !in_array(
            strtolower($file->getClientOriginalExtension()),
            explode(',', env('FILES_FORBIDDEN_EXTENSIONS')),
            true
        );
    }

    private function getSaveName(UploadedFile $file): string
    {
        return implode(
            '',
            [
                hash('sha256', $file->getClientOriginalName()),
                '_',
                round(microtime(true) * 1000),
                '.',
                $file->getClientOriginalExtension(),
            ]
        );
    }

    private function getSavedFileInfo(File $file): array
    {
        return [
            'name' => $file->getFilename(),
            'size' => $file->getSize(),
        ];
    }
}