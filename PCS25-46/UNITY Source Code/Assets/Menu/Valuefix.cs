using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class Valuefix : MonoBehaviour
{
    public GameObject a1;

    private string s1;
    public string t1;
  
  

    void Start()
    {

        
    }

    // Update is called once per frame
    void Update()
    {
        s1 = a1.GetComponent<TMP_InputField>().text;
        

           if (s1=="")
            {
              
                a1.GetComponent<TMP_InputField>().text=t1;
             }
        
    }


}
