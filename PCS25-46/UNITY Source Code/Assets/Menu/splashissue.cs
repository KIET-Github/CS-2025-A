using System.Collections;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Rendering;

public class splashissue : MonoBehaviour
{
    public GameObject a;
    public GameObject b;
 
 
    AudioSource sou;
    // Start is called before the first frame update
    void Start()
    {
       // StartCoroutine(SplashScreenController());
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
    public void wa5(int ab)
    {
        StartCoroutine(_wait(ab, () => {
            Debug.Log("5 seconds is lost forever");
            
        }));
    }
    void Update()
    {
        
        if (SplashScreen.isFinished==true)
        {
            Wait(1.5f, () => {
                Debug.Log("2 seconds is lost forever");
                b.SetActive(false);
                a.SetActive(true);
            });
            
            
            


            this.enabled = false;
            
        }
       
    }
}
