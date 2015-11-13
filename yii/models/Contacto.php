<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "contacto".
 *
 * @property integer $idContacto
 * @property string $nombre
 * @property string $correo
 * @property string $mensaje
 * @property string $timestamp
 */
class Contacto extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'contacto';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['nombre', 'correo', 'mensaje'], 'required'],
            [['idContacto'], 'integer'],
            [['timestamp'], 'safe'],
            [['nombre', 'correo'], 'string', 'max' => 100],
            ['correo', 'email'],
            [['mensaje'], 'string', 'max' => 500],
            // verifyCode needs to be entered correctly
            
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'idContacto' => Yii::t('app', 'Id Contacto'),
            'nombre' => Yii::t('app', 'Nombre'),
            'correo' => Yii::t('app', 'Correo'),
            'mensaje' => Yii::t('app', 'Mensaje'),
            'timestamp' => Yii::t('app', 'Timestamp'),
            'verifyCode' => Yii::t('app', 'Codigo de verificación'),
        ];
    }

    /**
     * @inheritdoc
     * @return \app\models\queries\ContactoQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\queries\ContactoQuery(get_called_class());
    }
    
    
    /**
     * @inheritdoc
     */
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if(!$this->idContacto)
            {
                $rows = (new \yii\db\Query())
                ->select(['idContacto'])
                ->from('contacto')
                ->orderBy("idContacto DESC")
                ->limit(1)
                ->one();
                
                $max = 0 ;
                
                /*
                $criteria = new CDbCriteria;
                $criteria->select = 'idContacto';
                $models = Contacto::model()->findAll($criteria);
                */
                
                foreach($rows->each() as $row)
                {
                  $max = $row->idContacto;
                    break;
                }
                        
                
                $this->idContacto = $max + 1;
                print_r($this->idContacto);
            }
            return true;
        } else {
            return false;
        }
    }
    
    
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'timestamp',
                'updatedAtAttribute' => false,
                'value' => new Expression('NOW()'),
            ],
        ];
    }
    
}
