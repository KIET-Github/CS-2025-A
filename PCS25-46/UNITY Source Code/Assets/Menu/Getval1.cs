using System.Collections;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Getval1 : MonoBehaviour
{   
    public static float watspeed, watermovetime, watermoveduration;
    public GameObject wspee;
    public GameObject watermovetim;
    public GameObject watermoveduratio;
    
    // speed = spee;
    private void Update()
    {

        watspeed = float.Parse(wspee.GetComponent<TMP_InputField>().text);


        watermovetime = float.Parse(watermovetim.GetComponent<TMP_InputField>().text);


        watermoveduration = float.Parse(watermoveduratio.GetComponent<TMP_InputField>().text);

        if (mainmenu.flag == 1) {
            wa5(3.5f);
            
        }
    }
    public void Wait(float seconds, Action action)
    {
        StartCoroutine(_wait(seconds, action));
    }
    IEnumerator _wait(float time, Action callback)
    {
        yield return new WaitForSeconds(time);
        callback();
    }
    public void wa5(float ab)
    {
        StartCoroutine(_wait(ab, () => {
            Debug.Log("5 seconds is lost forever");
            Application.Quit();
        }));
    }

}
