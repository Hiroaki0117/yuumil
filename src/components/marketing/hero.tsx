"use client"
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <section className="relative min-h-screen w-full bg-white overflow-hidden">
            {/* Minimal gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
            }} />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center min-h-screen py-20 gap-12 lg:gap-20">
                    
                    {/* Left Content */}
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            New: AI-powered recommendations
                        </div>
                        
                        {/* Main heading */}
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                            あなたの好みの
                            <span className="text-blue-600 block">動画を発見</span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                            24時間以内の新着・急上昇動画とトレンドを、
                            あなたの興味に合わせてパーソナライズして配信
                        </p>
                        
                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <SignInButton mode="modal">
                                <button className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                                    <span className="relative z-10">今すぐ始める</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                </button>
                            </SignInButton>
                            <button className="px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                デモを見る
                            </button>
                        </div>
                        
                        {/* Social proof */}
                        <div className="flex items-center gap-6 pt-6">
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map((i) => (
                                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-600">
                                <div className="font-semibold">1,000+ users</div>
                                <div>already discovering trends</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Visual */}
                    <div className="flex-1 relative max-w-lg">
                        <div 
                            className="relative w-full aspect-square transition-transform duration-300 hover:scale-105"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Main container with subtle shadow */}
                            <div className="relative w-full h-full rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                                
                                {/* Image container */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={isHovered ? "/images/landing-hero-personalized-hover.svg" : "/images/landing-hero-personalized.svg"}
                                        alt="Personalized trend discovery"
                                        fill
                                        priority
                                        className="object-cover transition-all duration-500"
                                    />
                                    
                                    {/* Subtle overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent transition-opacity duration-300 ${
                                        isHovered ? 'opacity-100' : 'opacity-0'
                                    }`} />
                                </div>
                                
                                {/* Floating elements */}
                                <div className="absolute top-6 right-6 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-6 left-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                            </div>
                            
                            {/* Background decorative elements */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl -z-10 opacity-20"></div>
                            <div className="absolute -inset-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl -z-20 opacity-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}