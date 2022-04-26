<?php

require "../vendor/autoload.php";

function randomstr($length = 16) {
    $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return substr(str_shuffle($chars), 0, $length);
}


$body = json_decode(file_get_contents('php://input'));

$phpWord = new \PhpOffice\PhpWord\PhpWord();
$phpWord->setDefaultFontName('Times New Roman');
$phpWord->setDefaultFontSize(14);

$property = $phpWord->getDocInfo();
$property->setCreator('123');
$property->setCompany('Company');
$property->setTitle('Title');
$property->setDescription('Description');
$property->setCategory('My category');
$property->setLastModifiedBy('My name');
$property->setCreated(mktime(0, 0, 0, 3, 12, 2015));
$property->setModified(mktime(0, 0, 0, 3, 14, 2015));
$property->setSubject('My subject');
$property->setKeywords('my, key, word');

$textStyle = array(
    'orientation' => 'portrait',
    'marginTop' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(2),
    'marginLeft' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(2),
    'marginRight' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(0.5),
    'colsNum' => 1,
    'pageNumberingStart' => 1,
    'borderBottomSize'=>100,
    'borderBottomColor'=>'C0C0C0'
);

$newSection = $phpWord->addSection($textStyle);
foreach ($body as $item) {
    switch($item->type) {
        case 'TITLE':
            $newSection->addText($item->content,array('bold' => TRUE, 'size' => 16), array('align' => 'center'));
            break;
        case 'TEXT':
            $newSection->addText($item->content,[],['align' => 'justified']);
            break;
    }
}

$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
$filename = "../files/" .randomstr() . ".docx";
$objWriter->save($filename);

$response['url'] = substr($filename, 2, strlen($filename));

print_r(json_encode($response));
