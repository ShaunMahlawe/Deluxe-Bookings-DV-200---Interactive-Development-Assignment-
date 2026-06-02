import { useState } from "react";
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
}) {
  const [activeFilter, setActiveFilter] = useState("All");

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

  return (
    <section className="my-listings-section">
      <div
        className={`my-listings-layout ${selectedListing ? "has-detail-pane" : ""}`}
      >
        <div className="my-listings-primary">
          <Row className="my-listings-toolbar align-items-center justify-content-end justify-content-md-between g-2">
            <Col xs="auto" md className="my-listings-filter-column">
              <div className="my-listings-filters d-none d-md-flex">
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

              <Dropdown className="my-listings-filter-dropdown d-md-none">
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
            {filteredListings.map((listing) => (
              <SellerListingCard
                key={listing._id}
                listing={listing}
                onEdit={onEdit}
                onStatusChange={onStatusChange}
                onViewDetails={() => onSelectListing(listing)}
              />
            ))}
          </div>
        </div>

        {selectedListing && (
          <IndividualListing
            listing={selectedListing}
            onClose={onCloseListing}
          />
        )}
      </div>
    </section>
  );
}

export default MyListingSection;
