#!/usr/bin/env python3
"""
Skills Client Demo — Discover, recommend, and install UitKit skills.

Shows:
  - Searching skills by query
  - Getting recommendations for a project
  - Installing skills
  - Browsing catalog by category
  - Checking installation status
"""

import sys
from uitkit_sdk import SkillsClient, SkillNotFoundError


def demo_search():
    """Demo: Search for skills by query."""
    print("=" * 70)
    print("DEMO 1: Search Skills")
    print("=" * 70)

    with SkillsClient() as skills:
        # Search for testing-related skills
        results = skills.search("testing", limit=5)
        print(f"\nSearch results for 'testing' ({len(results)} found):\n")
        for i, skill in enumerate(results, 1):
            print(f"{i}. {skill.name}")
            print(f"   ID: {skill.id}")
            print(f"   Category: {skill.category}")
            print(f"   Description: {skill.description}")
            print(f"   Tags: {', '.join(skill.tags)}")
            print()


def demo_consult():
    """Demo: Get skill recommendations for a project."""
    print("=" * 70)
    print("DEMO 2: Skill Recommendations (Consult)")
    print("=" * 70)

    queries = [
        "I need to build a REST API with authentication and testing",
        "I'm working on data processing and machine learning",
        "I need to optimize database queries and improve performance",
    ]

    with SkillsClient() as skills:
        for query in queries:
            print(f"\nQuery: {query!r}")
            print("-" * 70)

            recommendations = skills.consult(query)

            print(f"Recommended stack: {recommendations['recommended_stack']}")
            print(f"Top recommendations:")

            for i, skill_data in enumerate(recommendations["recommended_skills"][:3], 1):
                print(f"  {i}. {skill_data['name']} ({skill_data['id']})")
                print(f"     {skill_data['description']}")

            print()


def demo_install():
    """Demo: Install skills."""
    print("=" * 70)
    print("DEMO 3: Install Skills")
    print("=" * 70)

    with SkillsClient() as skills:
        # Install specific skills
        skill_ids = [
            "backend/fastapi-expert",
            "productivity/testing-suite",
            "database/postgresql-tuning",
        ]

        print(f"\nInstalling {len(skill_ids)} skills...\n")

        for skill_id in skill_ids:
            try:
                installed_skill = skills.install(skill_id)
                print(f"✓ Installed: {installed_skill.name}")
                print(f"  Version: {installed_skill.version}")
                print(f"  Path: {installed_skill.install_path}")
                print()
            except SkillNotFoundError as e:
                print(f"✗ Not found: {e.message}")
                print()

        # List installed skills
        print(f"\nInstalled skills ({len(skills.list_installed())} total):\n")
        for skill in skills.list_installed():
            print(f"  ✓ {skill.name} ({skill.id})")


def demo_catalog():
    """Demo: Browse catalog by category."""
    print("=" * 70)
    print("DEMO 4: Browse Catalog")
    print("=" * 70)

    with SkillsClient() as skills:
        # Get all categories
        all_skills = skills.list_catalog()
        categories = sorted(set(s.category for s in all_skills))

        print(f"\nAvailable categories ({len(categories)}):\n")

        for category in categories:
            category_skills = skills.list_catalog(category=category)
            print(f"  {category} ({len(category_skills)} skills)")

        # Show skills in a specific category
        print(f"\nSkills in 'backend' category:\n")
        backend_skills = skills.list_catalog(category="backend")
        for skill in backend_skills:
            print(f"  • {skill.name}")
            print(f"    {skill.description}")


def demo_workflow():
    """Demo: Real-world workflow combining multiple operations."""
    print("=" * 70)
    print("DEMO 5: Real-World Workflow")
    print("=" * 70)

    with SkillsClient() as skills:
        project_description = "Build a FastAPI microservice with PostgreSQL and async tasks"

        print(f"\nProject: {project_description}\n")

        # Get recommendations
        print("Step 1: Getting recommendations...")
        recs = skills.consult(project_description)

        print(f"Found {len(recs['recommended_skills'])} skills:\n")
        for i, skill_data in enumerate(recs["recommended_skills"], 1):
            print(f"  {i}. {skill_data['name']}")

        # Install recommended skills
        print("\nStep 2: Installing skills...")
        for skill_data in recs["recommended_skills"]:
            skill_id = skill_data["id"]
            try:
                installed = skills.install(skill_id)
                print(f"  ✓ {installed.name}")
            except SkillNotFoundError:
                print(f"  ○ {skill_id} (not in catalog)")

        # Show summary
        installed_skills = skills.list_installed()
        print(f"\nSummary:")
        print(f"  Total installed: {len(installed_skills)}")
        print(f"  Ready to use: {', '.join(s.name for s in installed_skills[:3])}")


if __name__ == "__main__":
    try:
        demo_search()
        print("\n")

        demo_consult()
        print("\n")

        demo_install()
        print("\n")

        demo_catalog()
        print("\n")

        demo_workflow()

        print("\n" + "=" * 70)
        print("All demos completed successfully!")
        print("=" * 70)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
