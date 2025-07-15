"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Folder, MessageCircle, LogOut } from "lucide-react";
import CloudinaryUploadButton from "@/components/CloudinaryUploadButton";

// Static credentials (consider migrating to environment variables for production)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

const AdminPage = () => {
  console.log("🎯 AdminPage component is loading!");
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState<string>("");

  // Data states
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    location: "",
    category: "",
    image: "",
    videourl: "",
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    company: "",
    text: "",
    rating: 5,
    image: "",
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'testimonials'>('dashboard');
  const [editPortfolioId, setEditPortfolioId] = useState<number | null>(null);
  const [editTestimonialId, setEditTestimonialId] = useState<number | null>(null);

  // Validation helpers
  const isTestimonialValid =
    newTestimonial.name.trim() !== "" &&
    newTestimonial.company.trim() !== "" &&
    newTestimonial.text.trim() !== "" &&
    newTestimonial.image.trim() !== "";

  // Load auth state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("adminAuth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch data once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      const { data: portData } = await supabase
        .from("portfolio")
        .select("id, title, location, image, videourl, category")
        .order("id", { ascending: false });
      setPortfolioItems(portData || []);

      const { data: testData } = await supabase
        .from("testimonials")
        .select("id, name, company, text, rating, image")
        .order("id", { ascending: false });
      setTestimonials(testData || []);
    };

    fetchData();
  }, [isAuthenticated]);

  // Monitor image changes
  useEffect(() => {
    console.log("🖼️ newTestimonial.image changed to:", newTestimonial.image);
  }, [newTestimonial.image]);

  // Monitor entire testimonial object changes
  useEffect(() => {
    console.log("📝 newTestimonial object changed:", newTestimonial);
  }, [newTestimonial]);

  /* ----------------------------- AUTH HANDLERS ---------------------------- */
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") localStorage.setItem("adminAuth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") localStorage.removeItem("adminAuth");
  };

  /* -------------------------- PORTFOLIO HANDLERS -------------------------- */
  const handlePortfolioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPortfolio({ ...newPortfolio, [e.target.name]: e.target.value });
  };

  const addPortfolio = async () => {
    const { error } = await supabase.from("portfolio").insert(newPortfolio);
    if (error) {
      alert("Failed to add portfolio item: " + error.message);
    } else {
      setNewPortfolio({ title: "", location: "", category: "", image: "", videourl: "" });
      // Refresh list
      const { data } = await supabase.from("portfolio").select("id, title, location, image, videourl, category");
      setPortfolioItems(data || []);
    }
  };

  const updatePortfolio = async () => {
    if (editPortfolioId === null) return;
    const { error } = await supabase.from("portfolio").update(newPortfolio).eq("id", editPortfolioId);
    if (error) {
      alert("Failed to update portfolio item: " + error.message);
    } else {
      setNewPortfolio({ title: "", location: "", category: "", image: "", videourl: "" });
      setEditPortfolioId(null);
      const { data } = await supabase.from("portfolio").select("id, title, location, image, videourl, category");
      setPortfolioItems(data || []);
    }
  };

  const deletePortfolio = async (id: number) => {
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) {
      alert("Failed to delete item: " + error.message);
    } else {
      setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
    }
  };

  /* ------------------------- TESTIMONIAL HANDLERS ------------------------- */
  // Use functional update to avoid stale state and ensure numeric rating parsing
  const handleTestimonialChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const addTestimonial = async () => {
    console.log("🚀 === STARTING ADD TESTIMONIAL ===");
    console.log("📊 Current newTestimonial state:", JSON.stringify(newTestimonial, null, 2));
    console.log("🖼️ Image URL specifically:", newTestimonial.image);
    console.log("📏 Image URL length:", newTestimonial.image?.length || 0);
    console.log("🔍 Is image URL truthy?", !!newTestimonial.image);
    
    const { data: inserted, error } = await supabase
      .from("testimonials")
      .insert([newTestimonial])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      alert("Failed to add testimonial: " + error.message);
      return;
    }

    console.log("✅ Supabase insert successful!");
    console.log("📋 Inserted data:", JSON.stringify(inserted, null, 2));
    console.log("🖼️ Image URL in inserted data:", inserted?.[0]?.image);
    console.log("🚀 === END ADD TESTIMONIAL ===");
    
    // Reset form
    setNewTestimonial({ name: "", company: "", text: "", rating: 5, image: "" });

    // Refresh testimonials list
    const { data } = await supabase
      .from("testimonials")
      .select("id, name, company, text, rating, image")
      .order("id", { ascending: false });
    setTestimonials(data || []);
  };

  const updateTestimonial = async () => {
    if (editTestimonialId === null) return;
    const { error } = await supabase.from("testimonials").update(newTestimonial).eq("id", editTestimonialId);
    if (error) {
      alert("Failed to update testimonial: " + error.message);
    } else {
      setNewTestimonial({ name: "", company: "", text: "", rating: 5, image: "" });
      setEditTestimonialId(null);
      const { data } = await supabase.from("testimonials").select("id, name, company, text, rating, image");
      setTestimonials(data || []);
    }
  };

  const deleteTestimonial = async (id: number) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      alert("Failed to delete testimonial: " + error.message);
    } else {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  /* ----------------------------------------------------------------------- */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efede7]">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-[#0a2449]">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-[#0a2449] text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#0a2449] text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {loginError && <p className="text-red-500 text-xs italic mb-4">{loginError}</p>}
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90">Login</Button>
          </div>
        </form>
      </div>
    );
  }

  /* --------------------------- ADMIN DASHBOARD --------------------------- */

  const uploadPreset = "helloideator"; // process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;
  console.log("🔧 Using upload preset:", uploadPreset);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a2449] text-[#efede7] flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Admin</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <button
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-[#0a2449]/70 transition-colors ${activeTab === 'dashboard' ? 'bg-[#0a2449]/70' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="w-5 h-5" /> Dashboard
          </button>
          <button
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-[#0a2449]/70 transition-colors ${activeTab === 'portfolio' ? 'bg-[#0a2449]/70' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Folder className="w-5 h-5" /> Portfolio
          </button>
          <button
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-[#0a2449]/70 transition-colors ${activeTab === 'testimonials' ? 'bg-[#0a2449]/70' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <MessageCircle className="w-5 h-5" /> Testimonials
          </button>
        </nav>
        <Button onClick={handleLogout} variant="outline" className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#efede7] p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <h1 className="text-3xl font-bold text-[#0a2449] mb-8">Welcome, Admin!</h1>
        )}

        {activeTab === 'portfolio' && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#0a2449]"></div>
              <Badge className="bg-[#0a2449] text-[#efede7] rounded-full px-4 py-2">
                Portfolio
              </Badge>
            </div>
            {/* List Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {portfolioItems.map((item) => (
                <div key={item.id} className="relative bg-white rounded-xl shadow p-4">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h3 className="font-semibold text-[#0a2449] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#0a2449]/70 mb-2">{item.location}</p>
                  <Badge className="mb-2">{item.category}</Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-blue-500" onClick={() => {setEditPortfolioId(item.id); setNewPortfolio({title:item.title,location:item.location,category:item.category,image:item.image,videourl:item.videourl}); setActiveTab('portfolio');}}>Edit</Button>
                    <Button size="sm" variant="outline" className="text-red-500" onClick={() => deletePortfolio(item.id)}>
                    Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add New Portfolio Item */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0a2449]">Add Portfolio Item</h3>
              <div className="space-y-4">
                {Object.keys(newPortfolio).map((key) => (
                  key !== "image" ? (
                  <input
                    key={key}
                    name={key}
                    placeholder={key}
                    value={(newPortfolio as any)[key] as string}
                    onChange={handlePortfolioChange}
                    className="w-full border p-2 rounded"
                  />) : (
                    <CloudinaryUploadButton
                      key="image-upload"
                      uploadPreset={uploadPreset}
                      onUpload={(url) =>
                        setNewPortfolio((prev) => ({ ...prev, image: url }))
                      }
                    />
                  )
                ))}
                {editPortfolioId ? (
                  <Button onClick={updatePortfolio} className="bg-green-600 text-white hover:bg-green-700 w-full">
                    Update Item
                  </Button>
                ) : (
                  <Button onClick={addPortfolio} className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 w-full">
                    Add Item
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'testimonials' && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#0a2449]"></div>
              <Badge className="bg-[#0a2449] text-[#efede7] rounded-full px-4 py-2">
                Testimonials
              </Badge>
            </div>
            {/* List Testimonials */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {testimonials.map((t) => (
                <div key={t.id} className="relative bg-white rounded-xl shadow p-4">
                  <h3 className="font-semibold text-[#0a2449] mb-1">{t.name}</h3>
                  <p className="text-sm text-[#0a2449]/70 mb-2">{t.company}</p>
                  <p className="text-sm mb-2 italic">"{t.text}"</p>
                  <Badge className="mb-2">Rating: {t.rating}</Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-blue-500" onClick={() => {setEditTestimonialId(t.id); setNewTestimonial({name:t.name,company:t.company,text:t.text,rating:t.rating,image:t.image}); setActiveTab('testimonials');}}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500" onClick={() => deleteTestimonial(t.id)}>
                    Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add New Testimonial */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0a2449]">Add Testimonial</h3>
              <div className="space-y-4">
                {Object.keys(newTestimonial).map((key) => (
                  key !== "image" ? (
                  <input
                    key={key}
                    name={key}
                    placeholder={key}
                    value={(newTestimonial as any)[key] as string}
                    onChange={handleTestimonialChange as any}
                    className="w-full border p-2 rounded"
                  />) : (
                    <div key={key} className="space-y-2">
                      {newTestimonial.image && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Image uploaded:</p>
                          <img src={newTestimonial.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                        </div>
                      )}
                      <CloudinaryUploadButton
                        key="testimonial-image"
                        uploadPreset={uploadPreset}
                        onUpload={(url) => {
                          console.log("=== TESTIMONIAL IMAGE UPLOAD CALLBACK ===");
                          console.log("Received URL:", url);
                          console.log("Current newTestimonial state before update:", newTestimonial);
                          setNewTestimonial((prev) => {
                            const updated = { ...prev, image: url };
                            console.log("New testimonial state after update:", updated);
                            return updated;
                          });
                          console.log("=== END TESTIMONIAL CALLBACK ===");
                        }}
                      />
                    </div>
                  )
                ))}
                {editTestimonialId ? (
                  <Button onClick={updateTestimonial} className="bg-green-600 text-white hover:bg-green-700 w-full">
                    Update Testimonial
                  </Button>
                ) : (
                  <Button onClick={addTestimonial} disabled={!isTestimonialValid} className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 w-full disabled:opacity-50 disabled:cursor-not-allowed">
                    Add Testimonial
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPage; 