import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import SellerListingCard from "../../components/seller/SellerListingCard";
import IndividualListing from "../../pages/seller/individualListing";
import { Col, Dropdown, Row } from "react-bootstrap";

import "../../css/MyListingSection.css";

const filters = [
  { label: "All", value: "All", statuses: [] },
  {
    label: "In review",
    value: "submitted_for_review",
    statuses: ["submitted_for_review"],
  },
  { label: "Published", value: "published", statuses: ["published"] },
  {
    label: "Unpublished",
    value: "unpublished_group",
    statuses: ["approved_unpublished", "removed_from_public", "unpublished"],
  },
];

function MyListingSection({
  listings,
  selectedListing,

  onSelectListing,

  onCloseListing,
  onEdit,
  onStatusChange,
  onCreate,
  onViewListingPage,
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [useListingPage, setUseListingPage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 834px)");

    const updateUseListingPage = () => {
      setUseListingPage(mediaQuery.matches);
    };

    updateUseListingPage();

    mediaQuery.addEventListener("change", updateUseListingPage);

    return () => {
      mediaQuery.removeEventListener("change", updateUseListingPage);
    };
  }, []);

  const visibleListings = listings.filter(
    (listing) => listing.status !== "rejected",
  );

  const filteredListings =
    activeFilter === "All"
      ? visibleListings
      : visibleListings.filter((listing) =>
          filters
            .find((filter) => filter.value === activeFilter)
            ?.statuses.includes(listing.status),
        );

  const getCount = (filterValue) => {
    if (filterValue === "All") return visibleListings.length;

    const filterStatuses =
      filters.find((filter) => filter.value === filterValue)?.statuses || [];

    return visibleListings.filter((listing) =>
      filterStatuses.includes(listing.status),
    ).length;
  };

  const activeFilterLabel =
    filters.find((filter) => filter.value === activeFilter)?.label || "Filter";

  const handleViewDetails = (listing, isSelected) => {
    if (useListingPage) {
      onViewListingPage?.(listing._id);
      return;
    }

    if (isSelected) {
      onCloseListing();
      return;
    }

    onSelectListing(listing);
  };

  return (
    <section className="my-listings-section">
      <div
        className={`my-listings-layout ${selectedListing ? "has-detail-pane" : ""}`}
      >
        <div className="my-listings-primary">
          <Row className="my-listings-toolbar align-items-center justify-content-end justify-content-md-between g-2">
            <Col xs="auto" md className="my-listings-filter-column">
              <div className="my-listings-filters">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    className={`my-listings-filter ${
                      activeFilter === filter.value ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label} ({getCount(filter.value)})
                  </button>
                ))}
              </div>

              <Dropdown className="my-listings-filter-dropdown">
                <Dropdown.Toggle
                  className="my-listings-filter-dropdown-toggle"
                  variant="light"
                  id="seller-status-filter"
                >
                  {activeFilterLabel} ({getCount(activeFilter)})
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  {filters.map((filter) => (
                    <Dropdown.Item
                      key={filter.value}
                      active={activeFilter === filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                    >
                      {filter.label} ({getCount(filter.value)})
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col xs="auto" md="auto" className="my-listings-action-column">
              <button
                type="button"
                className="my-listings-add-button seller-primary-action"
                onClick={onCreate}
              >
                <Plus aria-hidden="true" size={18} strokeWidth={2} />
                <span>Add Listing</span>
              </button>
            </Col>
          </Row>

          <div className="my-listings-list">
            <div className="my-listings-card-panel">
              <div className="my-listings-card-scroll">
                {filteredListings.map((listing) => {
                  const isSelected = selectedListing?._id === listing._id;

                  return (
                    <SellerListingCard
                      key={listing._id}
                      isSelected={isSelected}
                      listing={listing}
                      onEdit={onEdit}
                      onStatusChange={onStatusChange}
                      onViewDetails={() => handleViewDetails(listing, isSelected)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedListing && (
          <IndividualListing
            listing={selectedListing}
            onClose={onCloseListing}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
          />
        )}
      </div>
    </section>
  );
}

export default MyListingSection;
