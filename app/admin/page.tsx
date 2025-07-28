"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Folder, MessageCircle, LogOut, Inbox } from "lucide-react";
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

  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'testimonials' | 'enquiries'>('dashboard');
  const [editPortfolioId, setEditPortfolioId] = useState<number | null>(null);
  const [editTestimonialId, setEditTestimonialId] = useState<number | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  // Add state for enquiries
  const [enquiries, setEnquiries] = useState<any[]>([]);

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

      const fetchEnquiries = async () => {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching enquiries:', error);
        } else {
          setEnquiries(data || []);
        }
      };
      await fetchEnquiries();
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
          <button
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-[#0a2449]/70 transition-colors ${activeTab === 'enquiries' ? 'bg-[#0a2449]/70' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Inbox className="w-5 h-5" /> Enquiries
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

        {activeTab === 'enquiries' && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#0a2449]"></div>
              <Badge className="bg-[#0a2449] text-[#efede7] rounded-full px-4 py-2">
                Enquiries
              </Badge>
            </div>
            
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#0a2449]/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#0a2449] uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#0a2449] uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#0a2449] uppercase tracking-wider">Event Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#0a2449] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#0a2449] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#0a2449]">{enquiry.name}</div>
                          <div className="text-sm text-[#0a2449]/70">{enquiry.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#0a2449]">{enquiry.email}</div>
                          <div className="text-sm text-[#0a2449]/70">{enquiry.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge>{enquiry.event_type}</Badge>
                          <div className="text-sm text-[#0a2449]/70 mt-1">{enquiry.budget}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#0a2449]">
                            {enquiry.event_date ? new Date(enquiry.event_date).toLocaleDateString() : 'Not specified'}
                          </div>
                          <div className="text-sm text-[#0a2449]/70">
                            {enquiry.guest_count ? `${enquiry.guest_count} guests` : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enquiry);  
                              setShowEnquiryModal(true);
                            }}
                            className="text-blue-500 hover:text-blue-700 mr-3"
                          >
                            View
                          </button>
                          <button
                            onClick={async () => {
                              const { error } = await supabase
                                .from('contact_submissions')
                                .delete()
                                .eq('id', enquiry.id);
                              
                              if (!error) {
                                setEnquiries(enquiries.filter(e => e.id !== enquiry.id));
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Enquiry Details Modal */}
      {showEnquiryModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0a2449]">Enquiry Details</h2>
                <button
                  onClick={() => {
                    setShowEnquiryModal(false);
                    setSelectedEnquiry(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0a2449] mb-3 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-[#0a2449] font-medium">{selectedEnquiry.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-[#0a2449] font-medium">{selectedEnquiry.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-[#0a2449] font-medium">{selectedEnquiry.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company</label>
                      <p className="text-[#0a2449] font-medium">{selectedEnquiry.company || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0a2449] mb-3 border-b border-gray-200 pb-2">
                    Event Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Event Type</label>
                      <Badge className="mt-1">{selectedEnquiry.event_type}</Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget</label>
                      <p className="text-[#0a2449] font-medium">{selectedEnquiry.budget || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Event Date</label>
                      <p className="text-[#0a2449] font-medium">
                        {selectedEnquiry.event_date ? new Date(selectedEnquiry.event_date).toLocaleDateString() : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Guest Count</label>
                      <p className="text-[#0a2449] font-medium">
                        {selectedEnquiry.guest_count ? `${selectedEnquiry.guest_count} guests` : 'Not specified'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-[#0a2449] font-medium">{selectedEnquiry.location || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0a2449] mb-3 border-b border-gray-200 pb-2">
                    Message
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[#0a2449] whitespace-pre-wrap">{selectedEnquiry.message}</p>
                  </div>
                </div>

                {/* Submission Info */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0a2449] mb-3 border-b border-gray-200 pb-2">
                    Submission Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted On</label>
                      <p className="text-[#0a2449] font-medium">
                        {new Date(selectedEnquiry.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Enquiry ID</label>
                      <p className="text-[#0a2449] font-medium">#{selectedEnquiry.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => {
                    setShowEnquiryModal(false);
                    setSelectedEnquiry(null);
                  }}
                  variant="outline"
                >
                  Close
                </Button>
                <Button
                  onClick={async () => {
                    const { error } = await supabase
                      .from('contact_submissions')
                      .delete()
                      .eq('id', selectedEnquiry.id);
                    
                    if (!error) {
                      setEnquiries(enquiries.filter(e => e.id !== selectedEnquiry.id));
                      setShowEnquiryModal(false);
                      setSelectedEnquiry(null);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete Enquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage; 