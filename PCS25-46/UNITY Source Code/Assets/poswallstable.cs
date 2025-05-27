using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class poswallstable : MonoBehaviour
{
    public GameObject a;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

        transform.position = new Vector3(a.transform.position.x + 0.2f, a.transform.position.y, a.transform.position.z);
    }
}
