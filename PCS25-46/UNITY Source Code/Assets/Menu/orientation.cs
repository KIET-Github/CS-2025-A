using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class orientation : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Screen.orientation = ScreenOrientation.Portrait;
    }

    // Update is called once per frame
    void Update()
    {
        if (Screen.orientation != ScreenOrientation.Portrait)
        { Screen.orientation = ScreenOrientation.Portrait; }
    }
}
