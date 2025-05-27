using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Getval : MonoBehaviour
{
    public static float speed, wallmovetime, wallmoveduration;
    public GameObject spee;
    public GameObject wallmovetim;
    public  GameObject wallmoveduratio;

    // speed = spee;
    private void Update()
    {
        
    speed = float.Parse(spee.GetComponent<TMP_InputField>().text);
     
 
    wallmovetime = float.Parse(wallmovetim.GetComponent<TMP_InputField>().text);
       
    
    wallmoveduration = float.Parse(wallmoveduratio.GetComponent<TMP_InputField>().text);
        
    }

}
