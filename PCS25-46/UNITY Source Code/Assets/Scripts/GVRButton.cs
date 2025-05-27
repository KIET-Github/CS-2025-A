using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;

public class GVRButton : MonoBehaviour
{
    public UnityEvent GVRClick;
    bool gvrstatus;
    
    // Start is called before the first frame update
    void Start()
    {
        
    }
    public void gvron()
    {
        gvrstatus = true;
    }
    public void gvroff()
    {
        gvrstatus = false;
    }
    // Update is called once per frame
    void Update()
    {
        if(gvrstatus==true){
            if (Input.anyKeyDown)
            {
                GVRClick.Invoke();
                gvrstatus = false;
            }
        }
    }
}
