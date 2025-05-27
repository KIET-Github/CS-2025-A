using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;
using UnityEngine.SceneManagement;
using System.IO;

public class StartVr3 : MonoBehaviour
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
        string path2 = path + "/AcroStats.txt";
        if (File.Exists(path2) == false)
        {
            File.WriteAllText(path2, "Date\t\tTime\t\tTime Elapsed  WaitTime  FocusTime  GameCompleted?  MaxHeight\n\n");
        }
        string s;
        if (vrlook.e == 1) { s = "YES"; }
        else { s = "NO"; }
        string content1, content2;
        if (ValChange.min != 0)
        {
            content1 = System.DateTime.Now + "\t" + ValChange.s1 + "  \t";
            content2 = Getval2.waitingt + "\t\t" + Getval2.focunotfall + "\t\t" + s + "\t\t\t" + ValChange.HighestHigh+" \n";
        }
        else
        {
            content1 = System.DateTime.Now + "\t" + ValChange.s1 + "   \t\t";
            content2 = Getval2.waitingt + "\t\t" + Getval2.focunotfall + "\t\t" + s + "\t\t\t" + ValChange.HighestHigh + " \n";
        }
        File.AppendAllText(path2, content1 + content2);
        ValChange.HighestHigh = 0;
    }

}
