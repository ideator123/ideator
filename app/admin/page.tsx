"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Static credentials (consider migrating to environment variables for production)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

const AdminPage = () => {
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
    videoUrl: "",
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    company: "",
    text: "",
    rating: 5,
    image: "",
  });

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
        .select("id, title, location, image, videoUrl, category")
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
      setNewPortfolio({ title: "", location: "", category: "", image: "", videoUrl: "" });
      // Refresh list
      const { data } = await supabase.from("portfolio").select("id, title, location, image, videoUrl, category");
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
  const handleTestimonialChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTestimonial({ ...newTestimonial, [e.target.name]: e.target.value });
  };

  const addTestimonial = async () => {
    const { error } = await supabase.from("testimonials").insert(newTestimonial);
    if (error) {
      alert("Failed to add testimonial: " + error.message);
    } else {
      setNewTestimonial({ name: "", company: "", text: "", rating: 5, image: "" });
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
  return (
    <div className="min-h-screen bg-[#efede7] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0a2449]">Admin Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">Logout</Button>
      </div>

      {/* Portfolio Section */}
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
              <Button size="sm" variant="outline" className="text-red-500" onClick={() => deletePortfolio(item.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Portfolio Item */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-[#0a2449]">Add Portfolio Item</h3>
          <div className="space-y-4">
            {Object.keys(newPortfolio).map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key}
                value={(newPortfolio as any)[key] as string}
                onChange={handlePortfolioChange}
                className="w-full border p-2 rounded"
              />
            ))}
            <Button onClick={addPortfolio} className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 w-full">
              Add Item
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              <Button size="sm" variant="outline" className="text-red-500" onClick={() => deleteTestimonial(t.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Testimonial */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-[#0a2449]">Add Testimonial</h3>
          <div className="space-y-4">
            {Object.keys(newTestimonial).map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key}
                value={(newTestimonial as any)[key] as string}
                onChange={handleTestimonialChange as any}
                className="w-full border p-2 rounded"
              />
            ))}
            <Button onClick={addTestimonial} className="bg-[#0a2449] text-[#efede7] hover:bg-[#0a2449]/90 w-full">
              Add Testimonial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage; 