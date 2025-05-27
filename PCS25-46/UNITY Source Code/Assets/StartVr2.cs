using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;
using UnityEngine.SceneManagement;
using System.IO;

public class StartVr2 : MonoBehaviour
{
    // Start is called before the first frame update
    public void Start()
    {
      
        StartCoroutine(EnableVr("cardboard"));
    }

    public IEnumerator EnableVr(string VRi)
    {
        // Empty string loads the "None" device.
        XRSettings.LoadDeviceByName(VRi);
        // Must wait one frame after calling `XRSettings.LoadDeviceByName()`.
        yield return null;
        // Not needed, since loading the None (`""`) device takes care of 
        XRSettings.enabled = true;
    }
    public void Update()
    {
       if (Application.platform == RuntimePlatform.Android)
        {
            if (Input.GetKeyUp(KeyCode.Escape))
            {
               
                CreateText();
                SceneManager.LoadScene(0);
                return;
            }
        }
    }
    void CreateText()
    {
        string path = Application.persistentDataPath + "/PersonStats";
        if (Directory.Exists(path) == false)
        {
            Directory.CreateDirectory(path);
        }
        string path2 = path + "/AquaStats.txt";
        if (File.Exists(path2) == false)
        {
            File.WriteAllText(path2, "Date\t\tTime\t\tTime Elapsed  Speed  WaterMoveAfter  WaterMoveDur\n\n");
        }

        string s1;
        float min;
        int ab = (int)MoreHeight1.time;
        int abc = ab % 60;
        min = ab / 60;
        string content1;
        if (min != 0)
        {
            s1 = min.ToString() + " min " + abc.ToString() + " sec";
            content1 = System.DateTime.Now + "\t" + s1+"\t";
        }
        else
        {
            s1 = abc.ToString() + " sec";
            if (abc < 10)
            {
                content1 = System.DateTime.Now + "\t" + s1 + "\t\t\t ";
            }
            else { content1 = System.DateTime.Now + "\t" + s1 + "\t\t "; }
        }


        
        string content2 = Getval1.watspeed + "            " + Getval1.watermovetime + "\t\t\t" + Getval1.watermoveduration + "\t\t"+ " \n";
        File.AppendAllText(path2, content1 + content2);
    }

}
