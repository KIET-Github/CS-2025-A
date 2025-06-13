using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class scaleSphere : MonoBehaviour
{
    public float scaleFactor = 2.0f;
    public float duration = 1.0f;
    Vector3 originalScale;
    Vector3 targetScale;
    float elapsedTime = 0.0f;

    void Start()
    {
        originalScale = transform.localScale;
        targetScale = originalScale * scaleFactor;
    }

    void Update()
    {
        elapsedTime += Time.deltaTime;
        if (elapsedTime >= duration)
        {
            elapsedTime = 0.0f;
            Vector3 temp = targetScale;
            targetScale = originalScale;
            originalScale = temp;
        }

        float t = Mathf.Clamp01(elapsedTime / duration);
        transform.localScale = Vector3.Lerp(originalScale, targetScale, t);
    }
}
