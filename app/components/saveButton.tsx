"use client"

import { useFormStatus } from "react-dom"

export default function Savebutton(){
    const {pending}= useFormStatus();
    return(
        <button type="submit" className="border bg-green-400">{pending?"saving...":"save"}</button>
    )
}