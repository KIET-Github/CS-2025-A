using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.SceneManagement;
using System.IO;
using TMPro;
public class mainmenu : MonoBehaviour
{   //private Getval1 s;
    public  GameObject a;
    public  GameObject b;
    public  GameObject c;
    public static int flag = 0;
    private TextMeshProUGUI t;
    public GameObject tex;
    
    public void PlayClaus()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }
    public void PlayAqua()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 2);
    }
    public void PlayAcro()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 3);
    }
    public  void Quit()
    {
        
        
        b.SetActive(true);
        a.SetActive(false);
        c.SetActive(true);
        change();
    }
    public void change()
    {
        flag = 1;
    }
    public void CLAUSSTAT()
    {
        string path1 = Application.persistentDataPath + "/PersonStats";
        string path2=Application.persistentDataPath + "/PersonStats/ClausStats.txt"; ;
        if (Directory.Exists(path1) == false)
        {
            Directory.CreateDirectory(path1);
        }
        if (File.Exists(path2) == true)
        {
            t = tex.GetComponent<TextMeshProUGUI>();
            string word = File.ReadAllText(path2);
            Debug.Log(word.ToString());
            t.text = word.ToString();

        }
        else
        {

            t = tex.GetComponent<TextMeshProUGUI>();
            t.text = "No Claustro Data";

        }


    }
    public void AQUASTAT()
    {
        
        string path1 = Application.persistentDataPath + "/PersonStats";
        string path2 = Application.persistentDataPath + "/PersonStats/AquaStats.txt"; ;
        if (Directory.Exists(path1) == false)
        {
            Directory.CreateDirectory(path1);
        }
        if (File.Exists(path2) == true)
        {
            string word = File.ReadAllText(path2);
            t = tex.GetComponent<TextMeshProUGUI>();
            t.text = word.ToString();
        }
        else
        {

            t = tex.GetComponent<TextMeshProUGUI>();
            t.text = "No Aqua Data";

        }

    }
    public void ACROSTAT()
    {
        

        string path1 = Application.persistentDataPath + "/PersonStats";
        string path2 = Application.persistentDataPath + "/PersonStats/AcroStats.txt"; ;
        if (Directory.Exists(path1) == false)
        {
            Directory.CreateDirectory(path1);
        }
       
            if (File.Exists(path2) == true)
            {
            string word = File.ReadAllText(path2);
            t = tex.GetComponent<TextMeshProUGUI>();
            t.text = word.ToString();
        }
            else
            {
            t = tex.GetComponent<TextMeshProUGUI>();

            t.text = "No Acro Data";

        }


        
   /* static int getSDKInt()
    {
        using (var version = new AndroidJavaClass("android.os.Build$VERSION"))
        {
            return version.GetStatic<int>("SDK_INT");
        }*/
    }
}
