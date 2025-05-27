using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;

public class VrStop : MonoBehaviour
{
    // Start is called before the first frame update
    public void Start()
    {
        StartCoroutine(DisVr("None"));
    }

    public IEnumerator DisVr(string VRi)
    {
        // Empty string loads the "None" device.
        XRSettings.LoadDeviceByName(VRi);
        // Must wait one frame after calling `XRSettings.LoadDeviceByName()`.
        yield return null;
        // Not needed, since loading the None (`""`) device takes care of 
        XRSettings.enabled = false;
    }
}
