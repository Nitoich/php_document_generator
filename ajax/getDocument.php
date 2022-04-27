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
    'marginLeft' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(3),
    'marginRight' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(1.5),
    'marginBottom' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(2),
    'colsNum' => 1,
    'pageNumberingStart' => 1,
    'borderBottomSize'=>10,
    'borderTopSize' => 10,
    'borderRightSize' => 10,
    'borderLeftSize' => 10,
    'borderBottomColor'=>'000000',
    'borderTopColor'=>'000000',
    'borderRightColor'=>'000000',
    'borderLeftColor'=>'000000',
);

$newSection = $phpWord->addSection($textStyle);

$tableStyle = [
    'borderColor' => '000000',
    'borderSize' => 10,
    'cellMargin' => 50,
    'marginLeft' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(1)
];

$phpWord->addTableStyle('footerTable', $tableStyle, ['bgColor' => 'ffffff']);

$footer = $newSection->addFooter();
$footerTable = $footer->addTable('footerTable');
$row = $footerTable->addRow(100);
$row->addCell(200)->addText('1');
$row->addCell(200)->addText('2');
$row->addCell(200)->addText('3');



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
