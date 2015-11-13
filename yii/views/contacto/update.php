<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Contacto */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Contacto',
]) . ' ' . $model->idContacto;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Contactos'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->idContacto, 'url' => ['view', 'id' => $model->idContacto]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="contacto-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
