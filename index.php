<?php

require "./vendor/autoload.php";

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

$sectionStyle = array(

    'orientation' => 'portrait',
    'marginTop' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(2),
    'marginLeft' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(1.5),
    'marginRight' => \PhpOffice\PhpWord\Shared\Converter::cmToTwip(0.5),
    'colsNum' => 1,
    'pageNumberingStart' => 1,
    'borderBottomSize'=>100,
    'borderBottomColor'=>'C0C0C0'

);
$section = $phpWord->addSection($sectionStyle);
$section->addText("Для добавления текста, в будущий документ, необходимо использовать метод addText(). В качестве параметров, при вызове данного метода, необходимо передать следующее:");

$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
$objWriter->save('doc.docx');


require './view/home.php';